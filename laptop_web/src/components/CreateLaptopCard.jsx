// components/CreateLaptopCard.jsx
function CreateLaptopCard({ form, onChange, onSubmit, isLoggedIn }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Create Laptop (cần login)</h5>
        <form onSubmit={onSubmit} className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => onChange({ ...form, name: e.target.value })}
              required
              disabled={!isLoggedIn}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => onChange({ ...form, brand: e.target.value })}
              required
              disabled={!isLoggedIn}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => onChange({ ...form, price: e.target.value })}
              required
              disabled={!isLoggedIn}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={(e) => onChange({ ...form, description: e.target.value })}
              required
              disabled={!isLoggedIn}
            />
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-dark" type="submit">
              {isLoggedIn ? 'Add' : 'Login để Add'}
            </button>
          </div>
        </form>
        {!isLoggedIn && <small className="text-muted">Bạn cần login để tạo laptop.</small>}
      </div>
    </div>
  );
}

export default CreateLaptopCard;
