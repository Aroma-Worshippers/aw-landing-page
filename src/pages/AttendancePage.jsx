import { useEffect, useState, useRef, useCallback } from "react";
import { fetchAttendance, markAttendance } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AttendancePage() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [eventId] = useState("6869a1bae4d091c65d16712a");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [noMatch, setNoMatch] = useState(false);
  const debounceTimeout = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const loadAttendance = useCallback(() => {
    fetchAttendance(eventId, currentPage, searchKey)
      .then((res) => {
        const data = res.data.attendanceList || [];
        setAttendanceList(data);
        setPages(res.data.pages || 1);
        setNoMatch(data.length === 0);
      })
      .catch((err) => {
        console.error("Failed to fetch attendance", err);
      });
  }, [eventId, currentPage, searchKey]);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  const handleAttendance = (attendee) => {
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
        alert("Attendance marked!");
        loadAttendance();
      })
      .catch((err) => {
        console.error("Failed to mark attendance", err);
        alert("Error marking attendance");
      });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchKey(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setCurrentPage(1);
      loadAttendance();
    }, 300);
  };

  const clearSearch = () => {
    setSearchKey("");
    setCurrentPage(1);
    loadAttendance();
  };

  const highlightMatch = (text) => {
    if (!searchKey.trim()) return text;
    const regex = new RegExp(`(${searchKey})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchKey.toLowerCase() ? (
        <span key={i} className="font-bold bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-4 text-gray-800 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <button
          onClick={logout}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={searchKey}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        {searchKey && (
          <button
            onClick={clearSearch}
            className="absolute text-gray-500 right-3 top-2 hover:text-gray-800"
          >
            ×
          </button>
        )}
      </div>

      {noMatch ? (
        <p className="mt-10 text-center text-red-500">No match found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="text-white bg-green-600">
              <tr>
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Attendance</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {attendanceList.map((attendee) => {
                const isMarked = attendee.attendanceRecords?.length > 0;
                return (
                  <tr key={attendee._id}>
                    <td className="p-2 border">
                      {highlightMatch(attendee.fullName)}
                    </td>
                    <td className="p-2 border">
                      {highlightMatch(attendee.email)}
                    </td>
                    <td className="p-2 border">
                      {highlightMatch(attendee.phoneNumber)}
                    </td>
                    <td className="p-2 text-center border">
                      <input
                        type="checkbox"
                        checked={isMarked}
                        onChange={() => handleAttendance(attendee)}
                        disabled={isMarked}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
