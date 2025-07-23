import { useEffect, useState } from "react";
import { fetchAttendance, markAttendance } from "../services/api";

export default function AttendancePage() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKey, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const eventId = "6869a1bae4d091c65d16712a";

  useEffect(() => {
    const loadAttendance = () => {
      setLoading(true);
      fetchAttendance(eventId, currentPage, searchKey)
        .then((res) => {
          console.log(res.data.data);
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

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchQuery(e.target.search.value.trim());
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

  // Convert to Title Case
  const toTitleCase = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Registered Participants</h1>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            name="search"
            type="text"
            placeholder="Search name, email or phone..."
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Search
          </button>
        </form>
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
                      {toTitleCase(attendee.fullName || "")}
                    </td>
                    <td className="p-2 border">{attendee.email}</td>
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
