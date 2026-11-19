import { useState } from 'react';

export default function StudentVerification({ currentUser, onVerifySuccess }) {
  // ----- State variables / setters -----
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  // ----- Methods -----

  // handleRegister(e):
  //    Validates input and updates the UI by changing the step to 2
  function handleRegister(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      setMsg({ text: 'Please fill in all fields.', type: 'error' });
      return;
    }
    if (!email.toLowerCase().endsWith('.edu')) {
      setMsg({ text: 'Must use a valid .edu university email.', type: 'error' });
      return;
    }

    setStep(2);
    setMsg({ text: 'Verification code sent to ' + email + ' (Use code: 1234)', type: 'success' });
  }

  // handleVerify(e):
  //    Updates onVerifySuccess if the user enters the correct code and updates the UI by changing the step to 3
  function handleVerify(e) {
    e.preventDefault();
    if (code !== '1234') {
      setMsg({ text: 'Incorrect verification code. Try again.', type: 'error' });
      return;
    }

    onVerifySuccess({
      name,
      email,
      isVerified: true
    });

    setStep(3);
    setMsg({ text: 'Account verified successfully!', type: 'success' });
  }

  return (
    <div className="card">
      <h2>UC-01: Verify Student Account</h2>

      {msg.text && <div className={`message-box ${msg.type}`}>{msg.text}</div>}

      {step === 1 && (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Alex Student"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>University Email (.edu)</label>
            <input
              type="email"
              placeholder="e.g. alex@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Send Verification Code</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerify}>
          <p>Check your university inbox for the verification code.</p>
          <div className="form-group">
            <label>Enter 4-Digit Code</label>
            <input
              type="text"
              placeholder="1234"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button type="submit">Verify Account</button>
          <button type="button" style={{ marginLeft: '10px' }} onClick={() => setStep(1)}>
            Back
          </button>
        </form>
      )}

      {step === 3 && (
        <div>
          <p>You are now registered and verified as a student!</p>
          <button onClick={() => setStep(1)}>Register Another</button>
        </div>
      )}
    </div>
  );
}
