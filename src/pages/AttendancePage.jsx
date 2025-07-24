import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAttendance, markAttendance } from "../services/api";

export default function AttendancePage() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const debounceRef = useRef(null);
  const navigate = useNavigate();
  const eventId = "6869a1bae4d091c65d16712a";

  // Redirect if not logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch attendance
  const loadAttendance = useCallback(() => {
    setLoading(true);
    fetchAttendance(eventId, currentPage, searchKey)
      .then((res) => {
        const data = res.data.data.attendanceList;
        setAttendanceList(data);
        setTotalPages(res.data.data.pages);
        setNoMatch(data.length === 0);
      })
      .catch((err) => {
        console.error("Error fetching attendance:", err);
      })
      .finally(() => setLoading(false));
  }, [eventId, currentPage, searchKey]);

  // Trigger fetch when currentPage or searchKey changes
  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  // Debounced search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchKey(value);
    setCurrentPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadAttendance();
    }, 300);
  };

  const clearSearch = () => {
    setSearchKey("");
    setCurrentPage(1);
    loadAttendance();
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

  const highlight = (text) => {
    if (!searchKey) return text;
    const regex = new RegExp(`(${searchKey})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300">
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
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchKey}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded"
        />
        {searchKey && (
          <button
            onClick={clearSearch}
            className="absolute text-gray-500 -translate-y-1/2 right-2 top-1/2 hover:text-black"
            aria-label="Clear search"
          >
            &#10005;
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : noMatch ? (
        <p>No match found.</p>
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
                      {highlight(toTitleCase(attendee.fullName || ""))}
                    </td>
                    <td className="p-2 border">{highlight(attendee.email)}</td>
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
