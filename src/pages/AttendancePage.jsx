import {
  useEffect,
  useState,
  useCallback
} from "react";
import axios from "axios";
import {
  useNavigate
} from "react-router-dom";

export default function AttendancePage() {
  const navigate = useNavigate();
  const [attendees, setAttendees] = useState([]);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({
    day1: 0,
    day2: 0,
    day3: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

  const fetchAttendees = useCallback(() => {
    axios
      .get(`${BASE_URL}/attendance/6869a1bae4d091c65d16712a`)
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
  }, [BASE_URL]);

  useEffect(() => {
    const access = localStorage.getItem("admin_access");
    if (!access) {
      const code = prompt("Enter Admin Code");
      if (code ===
        import.meta.env.VITE_ADMIN_CODE) {
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
    const day1 = data.filter((a) => a.attendance ? .day1).length;
    const day2 = data.filter((a) => a.attendance ? .day2).length;
    const day3 = data.filter((a) => a.attendance ? .day3).length;
    setTotals({
      day1,
      day2,
      day3
    });
  };

  const toggleAttendance = (userId, day, current) => {
    axios
      .post(`${BASE_URL}/attendance`, {
        userId,
        day,
        status: !current,
      })
      .then(() => {
        const updated = attendees.map((a) =>
          a.id === userId ?
          {
            ...a,
            attendance: {
              ...a.attendance,
              [day]: !current
            },
          } :
          a
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

  if (loading)
    return ( <
      div className = "p-4 font-semibold text-green-700" > Loading attendees... < /div>
    );

  return ( <
    div className = "min-h-screen p-4 bg-white" >
    <
    h1 className = "mb-4 text-2xl font-bold text-green-700" >
    Conference Attendance <
    /h1>

    <
    div className = "mb-4" >
    <
    input type = "text"
    placeholder = "Search by name, email or phone"
    value = {
      searchTerm
    }
    onChange = {
      (e) => handleSearch(e.target.value)
    }
    className = "w-full p-2 mb-2 border border-green-500 rounded bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400" /
    >
    <
    div className = "space-y-1 font-semibold text-green-700" >
    <
    p > Total Day 1: {
      totals.day1
    } < /p> <
    p > Total Day 2: {
      totals.day2
    } < /p> <
    p > Total Day 3: {
      totals.day3
    } < /p> <
    /div> <
    /div>

    <
    table className = "w-full overflow-hidden border rounded" >
    <
    thead >
    <
    tr className = "text-white bg-green-700" >
    <
    th className = "p-2 border" > Name < /th> <
    th className = "p-2 border" > Email < /th> <
    th className = "p-2 border" > Phone < /th> <
    th className = "p-2 border" > Day 1 < /th> <
    th className = "p-2 border" > Day 2 < /th> <
    th className = "p-2 border" > Day 3 < /th> <
    /tr> <
    /thead> <
    tbody > {
      filteredAttendees.length === 0 ? ( <
        tr >
        <
        td colSpan = "6"
        className = "p-4 font-medium text-center text-green-700" >
        No attendees found. <
        /td> <
        /tr>
      ) : (
        filteredAttendees.map((attendee) => {
          return ( <
            tr key = {
              attendee.id
            }
            className = "border even:bg-green-50 hover:bg-green-100" >
            <
            td className = "p-2 border" > {
              attendee.name
            } < /td> <
            td className = "p-2 border" > {
              attendee.email
            } < /td> <
            td className = "p-2 border" > {
              attendee.phone
            } < /td> {
              ['day1', 'day2', 'day3'].map((day) => ( <
                td key = {
                  `${attendee.id}-${day}`
                }
                className = "p-2 text-center border cursor-pointer"
                onClick = {
                  () =>
                  toggleAttendance(
                    attendee.id,
                    day,
                    attendee.attendance ? . [day] || false
                  )
                } >
                <
                input type = "checkbox"
                checked = {
                  attendee.attendance ? . [day] || false
                }
                readOnly className = "w-5 h-5 accent-green-600" /
                >
                <
                /td>
              ))
            } <
            /tr>
          );
        })
      )
    } <
    /tbody> <
    /table> <
    /div>
  );
}
