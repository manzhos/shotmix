import React from "react";

export const AuthPage = () => {
  // const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    nickname: '', email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
 
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('api/auth/reg', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div>
      <h1>Authorisation Page</h1>
      <div className="card">
          <div className="card-header">
              Authorisation || Registration
          </div>
          <div className="card-body">
            <form>
                <div className="form-group">
                    <label htmlFor="nickname">Nickname</label>
                    <input id="nickname" name="nickname" type="text" className="form-control" placeholder="Nickname" onChange={changeHandler}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text"  className="form-control" placeholder="Email"  onChange={changeHandler}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className="form-control" placeholder="more then 6 secret symbols" onChange={changeHandler}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={loginHandler} disabled={loading}>Login</button>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <button type="submit" className="btn btn-outline-primary" onClick={registerHandler} disabled={loading}>Register</button>
            </form>
          </div>
          <div className="card-footer text-muted text-10">
              All data be safe
          </div>            
      </div>
    </div>
  )
}