export const renderBookingTable = (bookingsArray, title) => (
    <>
        <h1>{title}</h1>
        {bookingsArray.length > 0 ? (
            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Pets</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Confirmed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingsArray.map((booking) => (
                        <tr key={booking.id}>
                            <td>
                                {booking.pets && booking.pets.map(pet => pet.name).join(", ") || "Unknown Pet"}
                            </td>
                            <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                            <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                            <td>{booking.isConfirmed ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p>No {title.toLowerCase()} found.</p>
        )}
    </>
);
