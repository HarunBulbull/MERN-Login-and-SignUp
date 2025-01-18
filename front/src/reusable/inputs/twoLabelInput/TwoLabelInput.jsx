import './twoLabelInput.css'

function TwoLabelInput({label, type, change, keyDown}) {
  return (
    <div className="twoLabelInput_main">
      <input className='twoLabelInput_input' placeholder='' type={type} id={label} name={label} onKeyDown={(e) => keyDown(e)} onChange={(e) => change(e.target.value)}/>
      <label className='twoLabelInput_firstLabel' htmlFor={label}>{label}</label>
      <p className='twoLabelInput_secondLabel'>{label}</p>
    </div>
  )
}

export default TwoLabelInput
