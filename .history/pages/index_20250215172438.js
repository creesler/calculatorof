{/* Add this after the Simplify Calculator section */}
<div className="calculator-section">
  <h2>Decimal to Fraction Calculator</h2>
  <div className="calculator-grid">
    <div className="fraction-input">
      <input 
        type="number" 
        placeholder="Enter decimal"
        value={decimalInput}
        onChange={(e) => setDecimalInput(e.target.value)}
      />
      <button onClick={convertDecimalToFraction}>=</button>
      <div className="result">
        <div className="fraction">
          <span className="numerator">{fractionResult.numerator}</span>
          <span className="denominator">{fractionResult.denominator}</span>
        </div>
      </div>
    </div>
  </div>
</div> 