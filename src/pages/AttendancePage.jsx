import { useEffect, useState } from "react";
import { fetchAttendance, markAttendance } from "../services/api";

export default function AttendancePage() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKey, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const eventId = "6869a1bae4d091c65d16712a";

  // Highlight search matches
  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="text-black bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  useEffect(() => {
    const loadAttendance = () => {
      setLoading(true);
      fetchAttendance(eventId, currentPage, searchKey)
        .then((res) => {
          setAttendanceList(res.data.data.attendanceList);
          setTotalPages(res.data.data.pages);
        })
        .catch((err) => {
          console.error("Error fetching attendance:", err);
        })
        .finally(() => setLoading(false));
    };

    loadAttendance();
  }, [currentPage, searchKey]);

  const handleSearchKeyChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    if (newValue.trim() === "") {
      setCurrentPage(1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCurrentPage(1);
    }
  };

  const handleAttendanceMark = (attendee) => {
    const payload = {
      attendeeId: attendee._id,
      eventId,
      eventName: "mmc 2025",
      attendeeFullName: attendee.fullName,
      attendeeEmail: attendee.email,
      attendeePhoneNumber: attendee.phoneNumber,
    };

    markAttendance(payload)
      .then(() => {
        setAttendanceList((prev) =>
          prev.map((item) =>
            item._id === attendee._id
              ? {
                  ...item,
                  attendanceRecords: [
                    ...item.attendanceRecords,
                    { createdAt: new Date().toISOString() },
                  ],
                }
              : item
          )
        );
      })
      .catch((err) => {
        console.error("Failed to mark attendance", err);
        alert("Failed to mark attendance");
      });
  };

  const toTitleCase = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  return (
    <div className="max-w-5xl p-2 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Registered Participants</h1>
        <div className="flex w-full max-w-md gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by name, email or phone"
            value={searchKey}
            onChange={handleSearchKeyChange}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="text-sm text-left text-white bg-green-600">
                <th className="p-4 border">#</th>
                <th className="p-4 border">Full Name</th>
                <th className="p-4 border">Email</th>
                <th className="p-4 border">Phone</th>
                <th className="p-4 border">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(attendanceList) &&
                attendanceList.map((attendee, index) => (
                  <tr key={attendee._id} className="text-sm bg-white">
                    <td className="p-4 border">
                      {(currentPage - 1) * 50 + index + 1}
                    </td>
                    <td className="p-2 border">
                      {highlightMatch(
                        toTitleCase(attendee.fullName || ""),
                        searchKey
                      )}
                    </td>
                    <td className="p-2 border">
                      {highlightMatch(attendee.email, searchKey)}
                    </td>
                    <td className="p-2 border">
                      {highlightMatch(attendee.phoneNumber, searchKey)}
                    </td>
                    <td className="p-2 text-center border">
                      <input
                        type="checkbox"
                        onChange={() => handleAttendanceMark(attendee)}
                        checked={attendee.attendanceRecords.length > 0}
                        disabled={attendee.attendanceRecords.length > 0}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-green-400 rounded hover:bg-green-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-green-300 rounded hover:bg-green-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
