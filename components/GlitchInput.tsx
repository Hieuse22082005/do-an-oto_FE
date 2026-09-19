import React from 'react';

export default function GlitchInput({ id, label, value, onChange, maxLength, name, type = "text", className = "" }: any) {
  return (
    <div className={`glitch-input-wrapper ${className}`}>
      <div className="input-container">
        <input
          type={type}
          id={id}
          name={name}
          className="holo-input"
          placeholder=" "
          required
          value={value}
          onChange={onChange}
          maxLength={maxLength}
        />
        <label htmlFor={id} className="input-label" data-text={label}>
          {label}
        </label>

        <div className="input-border"></div>
        <div className="input-scanline"></div>
        <div className="input-glow"></div>

        <div className="input-data-stream">
          <div className="stream-bar" style={{ "--i": 0 } as any}></div>
          <div className="stream-bar" style={{ "--i": 1 } as any}></div>
          <div className="stream-bar" style={{ "--i": 2 } as any}></div>
          <div className="stream-bar" style={{ "--i": 3 } as any}></div>
          <div className="stream-bar" style={{ "--i": 4 } as any}></div>
          <div className="stream-bar" style={{ "--i": 5 } as any}></div>
          <div className="stream-bar" style={{ "--i": 6 } as any}></div>
          <div className="stream-bar" style={{ "--i": 7 } as any}></div>
          <div className="stream-bar" style={{ "--i": 8 } as any}></div>
          <div className="stream-bar" style={{ "--i": 9 } as any}></div>
        </div>

        <div className="input-corners">
          <div className="corner corner-tl"></div>
          <div className="corner corner-tr"></div>
          <div className="corner corner-bl"></div>
          <div className="corner corner-br"></div>
        </div>
      </div>
    </div>
  );
}
