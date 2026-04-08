// components/LaptopTable.jsx
function LaptopTable({ laptops, loading, onRefresh }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">Laptop List</h5>
          <button className="btn btn-outline-primary btn-sm" onClick={onRefresh}>
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : laptops.length === 0 ? (
          <p className="mb-0">Chưa có dữ liệu laptop.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {laptops.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default LaptopTable;
