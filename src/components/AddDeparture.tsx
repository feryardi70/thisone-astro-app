import { useState } from "react";

export default function InsertDeparture() {
  const [loading, setLoading] = useState(false);

  // const [data, setData] = useState({
  //   airline: "",
  //   flightnumber: "",
  //   destination: "",
  //   departdate: "",
  //   departtime: "",
  //   gate: "",
  //   remark: "",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setData({
  //     ...data,
  //     [e.target.name]: value,
  //   });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // const departureData = {
    //   airline: data.airline,
    //   flightnumber: data.flightnumber,
    //   destination: data.destination,
    //   departdate: data.departdate,
    //   departtime: data.departtime,
    //   gate: data.gate,
    //   remark: data.remark,
    // };

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const searchParams = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      searchParams.append(key, value.toString());
    }

    const response = await fetch("http://localhost:8787/departure", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: searchParams.toString(),
    });

    const result = (await response.json()) as any;
    //console.log(result);

    if (result.message == "success") {
      setLoading(true);
      alert("Departure added successfully!");
      // Redirect after success
      window.location.href = "/departure";
    } else {
      console.log("failed to add data");
      setLoading(true);
      alert("failed to add data");
    }
  };

  return (
    <div className="px-5 py-5 mx-auto mt-10 shadow-md max-w-xl min-h-96 w-full border-t-4 border-fuchsia-500">
      <h2 className="mb-5 text-center text-3xl">Form Add Flight Departure</h2>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="airline" className="mb-1 text-slate-500">
              Airline
            </label>
            <input type="text" maxLength={2} className="px-2 py-2 mb-5 border-2 border-fuchsia-200 focus:border-blue-700 rounded-md outline-none" id="airline" name="airline" placeholder="masukkan kode airline" aria-describedby="airline" />

            <label htmlFor="flightnumber" className="mb-1 text-slate-500">
              Flight Number
            </label>
            <input type="number" className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none" id="flightnumber" name="flightnumber" placeholder="1266" aria-describedby="flightnumber" />

            <label htmlFor="destination" className="mb-1 text-slate-500">
              Destination
            </label>
            <input type="text" className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none" id="destination" name="destination" placeholder="nama kota" aria-describedby="destination" />

            <label htmlFor="departdate" className="mb-1 text-slate-500">
              Departure Date
            </label>
            <input type="date" className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none" id="departdate" name="departdate" aria-describedby="departdate" />
          </div>

          <div className="flex flex-col w-[48%]">
            <label htmlFor="departtime" className="mb-1 text-slate-500">
              Departure Time
            </label>
            <input type="time" className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none" id="departime" name="departime" aria-describedby="departime" />

            <label htmlFor="gate" className="mb-1 text-slate-500">
              Gate
            </label>
            <input type="text" className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none" id="gate" name="gate" placeholder="01" aria-describedby="gate" />

            <label htmlFor="remark" className="mb-1 text-slate-500">
              Remark
            </label>
            <input type="text" className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none" id="remark" name="remark" aria-describedby="remark" />
          </div>
        </div>

        <button type="submit" className="px-2 py-2 bg-fuchsia-500 rounded text-white">
          {loading ? "Processing..." : "Add"}
        </button>
      </form>
    </div>
  );
}
