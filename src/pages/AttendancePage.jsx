// AttendancePage.jsx - Optimized typography and UX
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
  const eventId = "6a2cda72a40f4e6c213ab50c";

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
        setNoMatch(true);
      })
      .finally(() => setLoading(false));
  }, [eventId, currentPage, searchKey]);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  // Debounced search
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

  const handleAttendanceMark = async (attendee) => {
    const payload = {
      attendeeId: attendee._id,
      eventId,
      eventName: "mmc 2026",
      attendeeFullName: attendee.fullName,
      attendeeEmail: attendee.email,
      attendeePhoneNumber: attendee.phoneNumber,
    };

    try {
      await markAttendance(payload);
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
    } catch (err) {
      console.error("Failed to mark attendance", err);
      alert("Failed to mark attendance. Please try again.");
    }
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
        <mark key={i} className="bg-yellow-200 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
            Registered Participants
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track attendance for MMC
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchKey}
              onChange={handleSearchChange}
              className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchKey && (
              <button
                onClick={clearSearch}
                className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Total: {attendanceList.length} participants
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-green-500 rounded-full border-t-transparent animate-spin" />
            <span className="ml-3 text-gray-600">Loading participants...</span>
          </div>
        )}

        {/* No Results */}
        {!loading && noMatch && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No participants found.</p>
            {searchKey && (
              <button
                onClick={clearSearch}
                className="mt-2 text-sm text-green-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Table */}
        {!loading && !noMatch && attendanceList.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-green-700">
                    <th className="px-4 py-3 text-sm font-semibold text-left text-white md:text-base">#</th>
                    <th className="px-4 py-3 text-sm font-semibold text-left text-white md:text-base">Full Name</th>
                    <th className="px-4 py-3 text-sm font-semibold text-left text-white md:text-base">Email</th>
                    <th className="px-4 py-3 text-sm font-semibold text-left text-white md:text-base">Phone</th>
                    <th className="px-4 py-3 text-sm font-semibold text-center text-white md:text-base">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceList.map((attendee, index) => (
                    <tr key={attendee._id} className="transition border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {(currentPage - 1) * 50 + index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {highlight(toTitleCase(attendee.fullName || ""))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {highlight(attendee.email)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {attendee.phoneNumber}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          onChange={() => handleAttendanceMark(attendee)}
                          checked={attendee.attendanceRecords?.length > 0}
                          disabled={attendee.attendanceRecords?.length > 0}
                          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-4 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}