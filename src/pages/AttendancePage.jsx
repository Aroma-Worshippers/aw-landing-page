import { useEffect, useState, useCallback } from "react";
import { fetchAttendance, markAttendance } from "../services/api";

let debounceTimeout;

export default function AttendancePage() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const eventId = "6869a1bae4d091c65d16712a";

  const loadAttendance = useCallback(() => {
    setLoading(true);
    fetchAttendance(eventId, currentPage, searchKey)
      .then((res) => {
        const list = res.data.data.attendanceList;
        setAttendanceList(list);
        setTotalPages(res.data.data.pages);
        setNoMatch(list.length === 0);
      })
      .catch((err) => {
        console.error("Error fetching attendance:", err);
      })
      .finally(() => setLoading(false));
  }, [eventId, currentPage, searchKey]);

  useEffect(() => {
    loadAttendance();
  }, [currentPage, loadAttendance]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchKey(value);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setCurrentPage(1);
      loadAttendance();
    }, 5000);
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

  const highlightMatch = (text) => {
    if (!searchKey.trim()) return toTitleCase(text);
    const regex = new RegExp(`(${searchKey})`, "gi");
    return toTitleCase(text).split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-5xl p-2 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Registered Participants</h1>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchKey}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCurrentPage(1);
                loadAttendance();
              }
            }}
            className="w-full px-3 py-2 pr-10 border rounded"
          />
          {searchKey.trim() && (
            <button
              onClick={() => {
                setSearchKey("");
                setCurrentPage(1);
                loadAttendance();
              }}
              className="absolute text-gray-400 -translate-y-1/2 right-2 top-1/2 hover:text-black"
              title="Clear search"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : noMatch ? (
        <p className="text-center text-red-500">No match found.</p>
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
              {attendanceList.map((attendee, index) => (
                <tr key={attendee._id} className="text-sm bg-white">
                  <td className="p-4 border">
                    {(currentPage - 1) * 50 + index + 1}
                  </td>
                  <td className="p-2 border">
                    {highlightMatch(attendee.fullName || "")}
                  </td>
                  <td className="p-2 border">
                    {highlightMatch(attendee.email || "")}
                  </td>
                  <td className="p-2 border">{attendee.phoneNumber}</td>
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

          {/* Pagination Controls */}
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
                setCurrentPage((prev) =>
                  prev < totalPages ? prev + 1 : prev
                )
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
