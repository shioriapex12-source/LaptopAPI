// components/LoginCard.jsx
function LoginCard({ form, onChange, onSubmit, onLogout }) {
  return (
    <div className="col-12 col-lg-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Login</h5>
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
            <div className="d-flex gap-2">
              <button className="btn btn-success" type="submit">
                Login
              </button>
              <button className="btn btn-outline-secondary" type="button" onClick={onLogout}>
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
