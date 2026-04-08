// components/RegisterCard.jsx
function RegisterCard({ form, onChange, onSubmit }) {
  return (
    <div className="col-12 col-lg-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Register</h5>
          <form onSubmit={onSubmit} className="d-grid gap-2">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => onChange({ ...form, email: e.target.value })}
              required
            />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={form.pwd}
              onChange={(e) => onChange({ ...form, pwd: e.target.value })}
              required
            />
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterCard;
