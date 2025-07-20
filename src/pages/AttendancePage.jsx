import { useEffect, useState, useCallback } from "react";
import { fetchAttendance, markAttendance } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AttendancePage() {
  const eventId = "6869a1bae4d091c65d16712a";
  const eventName = "mmc 2025";

  const navigate = useNavigate();

  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 50;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const getAttendanceList = useCallback(() => {
    setLoading(true);
    fetchAttendance(eventId, currentPage, searchTerm)
      .then((response) => {
        setAttendanceList(response.data.data.attendanceList);
        setTotalPages(response.data.data.pages || 1);
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
      })
      .finally(() => setLoading(false));
  }, [eventId, currentPage, searchTerm]);

  const handleMarkAttendance = (attendee) => {
    markAttendance({
      attendeeId: attendee._id,
      eventId,
      eventName,
      attendeeFullName: attendee.fullName,
      attendeeEmail: attendee.email,
      attendeePhoneNumber: attendee.phoneNumber,
    })
      .then(() => {
        alert(`Attendance marked for ${attendee.fullName}`);
        getAttendanceList();
      })
      .catch((error) => {
        console.error("Error marking attendance:", error);
        alert("Error marking attendance");
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toTitleCase = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    if (phone.startsWith("+234")) {
      return "0" + phone.slice(4);
    }
    return phone;
  };

  useEffect(() => {
    getAttendanceList();
  }, [getAttendanceList]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <h1 className="text-3xl font-bold">Attendance Dashboard</h1>
        <div className="flex gap-4">
          <div className="w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by full name..."
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-3 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-16 h-16 transition-colors duration-700 border-4 border-white rounded-full border-t-green-600 animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="text-white bg-green-600 border-b border-gray-300">
                <th className="px-4 py-3 text-left border-r border-gray-300">
                  S/N
                </th>
                <th className="px-4 py-3 text-left border-r border-gray-300">
                  Full Name
                </th>
                <th className="px-4 py-3 text-left border-r border-gray-300">
                  Email
                </th>
                <th className="px-4 py-3 text-left border-r border-gray-300">
                  Phone Number
                </th>
                <th className="px-4 py-3 text-center">Mark Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((attendee, index) => (
                <tr key={attendee._id} className="border-b border-gray-300">
                  <td className="px-4 py-3 border-r border-gray-300">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300">
                    {toTitleCase(attendee.fullName)}
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300">
                    {attendee.email}
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300">
                    {formatPhoneNumber(attendee.phoneNumber)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      onChange={() => handleMarkAttendance(attendee)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-green-500 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
