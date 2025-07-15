import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AttendancePage() {
  const navigate = useNavigate();
  const [attendees, setAttendees] = useState([]);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ day1: 0, day2: 0, day3: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAttendees = useCallback(() => {
    axios
      .get("/api/attendees")
      .then((response) => {
        setAttendees(response.data);
        setFilteredAttendees(response.data);
        updateTotals(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const access = localStorage.getItem("admin_access");
    if (!access) {
      const code = prompt("Enter Admin Code");
      if (code === import.meta.env.VITE_ADMIN_CODE) {
        localStorage.setItem("admin_access", "granted");
      } else {
        alert("Access Denied");
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchAttendees();
  }, [fetchAttendees]);

  const updateTotals = (data) => {
    const day1 = data.filter((a) => a.attendance?.day1).length;
    const day2 = data.filter((a) => a.attendance?.day2).length;
    const day3 = data.filter((a) => a.attendance?.day3).length;
    setTotals({ day1, day2, day3 });
  };

  const toggleAttendance = (userId, day, current) => {
    axios
      .patch(`/api/attendance/${userId}`, {
        day,
        status: !current,
      })
      .then(() => {
        const updated = attendees.map((a) =>
          a.id === userId
            ? {
                ...a,
                attendance: { ...a.attendance, [day]: !current },
              }
            : a
        );
        setAttendees(updated);
        handleSearch(searchTerm, updated);
        updateTotals(updated);
      })
      .catch((error) => {
        console.error("Failed to update attendance", error);
        alert("Error updating attendance");
      });
  };

  const handleSearch = (term, data = attendees) => {
    setSearchTerm(term);
    const filtered = data.filter(
      (a) =>
        a.name.toLowerCase().includes(term.toLowerCase()) ||
        a.email.toLowerCase().includes(term.toLowerCase()) ||
        a.phone.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredAttendees(filtered);
    updateTotals(filtered);
  };

  if (loading) return <div className="p-4">Loading attendees...</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Conference Attendance</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-2 mb-2 border"
        />
        <p>Total Day 1: {totals.day1}</p>
        <p>Total Day 2: {totals.day2}</p>
        <p>Total Day 3: {totals.day3}</p>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Day 1</th>
            <th className="p-2 border">Day 2</th>
            <th className="p-2 border">Day 3</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendees.map((attendee) => (
            <tr key={attendee.id} className="border">
              <td className="p-2 border">{attendee.name}</td>
              <td className="p-2 border">{attendee.email}</td>
              <td className="p-2 border">{attendee.phone}</td>
              {["day1", "day2", "day3"].map((day) => (
                <td
                  key={day}
                  className="p-2 text-center border cursor-pointer"
                  onClick={() =>
                    toggleAttendance(
                      attendee.id,
                      day,
                      attendee.attendance?.[day] || false
                    )
                  }
                >
                  <input
                    type="checkbox"
                    checked={attendee.attendance?.[day] || false}
                    readOnly
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
