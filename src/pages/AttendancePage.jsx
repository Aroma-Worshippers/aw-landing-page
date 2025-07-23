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
          setAttendanceList(res.data.attendanceList);
          setTotalPages(res.data.pages);
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
    setCurrentPage(1); // reset to first page on new search
    setSearchQuery(e.target.search.value.trim());
  };

  const handleAttendanceMark = (attendee) => {
    const payload = {
      attendeeId: attendee._id,
      eventId: "6869a1bae4d091c65d16712a",
      eventName: "mmc 2025",
      attendeeFullName: attendee.fullName,
      attendeeEmail: attendee.email,
      attendeePhoneNumber: attendee.phoneNumber,
    };

    markAttendance(payload)
      .then(() => {
        alert("Attendance marked!");

        // Optional: update UI without reloading
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
  
  return (
    <div className="max-w-5xl p-6 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Registered Participants</h1>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          name="search"
          type="text"
          placeholder="Search name, email or phone..."
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Attendance Count</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList && attendanceList.length > 0 ? (
                attendanceList.map((attendee, index) => (
                  <tr key={attendee._id} className="border-t">
                    <td className="px-4 py-2">
                      {(currentPage - 1) * 50 + index + 1}
                    </td>
                    <td className="px-4 py-2">{attendee.fullName}</td>
                    <td className="px-4 py-2">{attendee.email}</td>
                    <td className="px-4 py-2">{attendee.phoneNumber}</td>
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        onChange={() => handleAttendanceMark(attendee)}
                        checked={attendee.attendanceRecords.length > 0}
                        disabled={attendee.attendanceRecords.length > 0}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
            ;
          </table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
