import { useState, useEffect } from "react";
import SpinnerCss from "./Spinner";

interface Departure {
  id: string;
  airline: string;
  flightnumber: string;
  destination: string;
  departdate: string;
  departime: string;
  gate: string;
  remark: string;
}

export default function DepartureList() {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDepartures = async () => {
    try {
      const response = await fetch("http://localhost:8787/departure", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = (await response.json()) as any;
      //console.log(data);

      setDepartures(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartures();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartureId, setSelectedDepartureId] = useState<number | string | null>(null);

  const openModal = (id: number | null | string) => {
    setSelectedDepartureId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: any) => {
    try {
      //console.log(id);
      const response = await fetch(`http://localhost:8787/departure/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: id,
      });

      if (response.status === 200) {
        alert("Successfully deleted departure");
        // Trigger re-fetch or update state
        window.location.href = "/departure";
      }
    } catch (error) {
      console.error("Error deleting departure:", error);
    } finally {
      closeModal();
    }
  };

  const renderDepartures = () => {
    return departures.map((depart, i) => {
      return (
        <tr key={depart.id}>
          <td className="text-center w-7 px-3 py-2">{++i}</td>
          <td className="hidden">{depart.id}</td>
          <td className="text-center px-3 py-2">{depart.airline}</td>
          <td className="text-center px-3 py-2">{depart.flightnumber}</td>
          <td className="text-center px-3 py-2">{depart.destination}</td>
          <td className="text-center px-3 py-2">{depart.departdate}</td>
          <td className="text-center px-3 py-2">{depart.departime}</td>
          <td className="text-center w-20 px-3 py-2">{depart.gate}</td>
          <td className="text-center px-3 py-2">{depart.remark}</td>
          <td className="text-center px-3 py-2">
            <span className="px-3 py-1 bg-green-400 rounded-lg">
              <a href={`/departure/${depart.id}`} target="_blank">
                edit
              </a>
            </span>
            <span className="px-2 py-1 bg-red-400 rounded-lg ml-1">
              <button onClick={() => openModal(depart.id)}>Delete</button>
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {/* <RootLayout title="Departure Dashboard"> */}
      {/* <DepartureRoute> */}
      <div className="px-10 py-10">
        <div>
          <h1 className="text-4xl tracking-wide mb-3">Departure Dashboard</h1>
        </div>
        <div className="mb-3">
          <span className="px-3 py-3 bg-sky-950 text-white">
            <a href="/">Home</a>
          </span>
          <span className="px-3 py-3 bg-sky-950 text-white">
            <a href="/add-departure">Add Departure</a>
          </span>
          <span className="px-3 py-3 bg-sky-950 text-white">
            <a href="/viewdeparture" target="_blank">
              View Departure
            </a>
          </span>
        </div>

        <table className="my-4 w-full border-collapse">
          <thead className="text-lg mb-5">
            <tr>
              <th className="text-center w-7 px-3">#</th>
              <th className="hidden">No. Database</th>
              <th className="text-center px-3">Airline</th>
              <th className="text-center px-3">Flight Number</th>
              <th className="text-center px-3">Destination</th>
              <th className="text-center px-3">Departure Date</th>
              <th className="text-center px-3">Time</th>
              <th className="text-center px-3">Gate</th>
              <th className="text-center px-3">Remark</th>
              <th className="text-center px-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-xl">{renderDepartures()}</tbody>
        </table>
        {isLoading ? <SpinnerCss /> : null}
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this?</h3>
              <div className="flex justify-end space-x-4">
                <button onClick={() => handleDelete(selectedDepartureId)} className="bg-fuchsia-500 text-white px-4 py-2 rounded">
                  Yes
                </button>
                <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* </DepartureRoute> */}
      {/* </RootLayout> */}
    </>
  );
}
