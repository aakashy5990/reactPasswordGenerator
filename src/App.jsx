import { useState, useCallback, useEffect,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

    const copyPasswordToClipboard = useCallback(() => {
      // console.log(passwordRef.current);
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,length);
      window.navigator.clipboard.writeText(password);
    }, [password]) 
  
  useEffect(()=>{
    passwordGenerator();
  },  [length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-black">
        <div
          className="bg-dark text-white p-4 rounded shadow"
          style={{ width: "400px" }}
        >
          <h4 className="text-center mb-3">Password generator</h4>

          <div className="input-group mb-3">
            <input
              type="text"
              value={password}
              className="form-control"
              readOnly
              ref={passwordRef}
            />
            <button className="btn btn-primary" onClick={copyPasswordToClipboard}>Copy</button>
          </div>

          <label htmlFor="lengthRange" className="form-label">
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={100}
            // value={length}
            className="form-range mb-3"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="form-check-label" htmlFor="numbers">
              Numbers
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="form-check-label" htmlFor="characters">
              Characters
            </label>
          </div>

          <button className="btn btn-success w-100" onClick={passwordGenerator}>Generate Password</button>
        </div>
      </div>
    </>
  );
}

export default App;
