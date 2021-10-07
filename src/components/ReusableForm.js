import React from "react";
import PropTypes from "prop-types";

const ReusableForm = (props) => {
  console.log(props)
  return (
    <React.Fragment>
      <div className="ui inverted segment">
        <form className="ui inverted form" onSubmit={props.submitForm}>
        <div className="field">
            <label>Title</label>
            <input
              type='text'
              name='title'
              placeholder='My realization of privilege' />
          </div>
          <div className="field">
            <label>Feeling</label>
            <input
              type='text'
              name='feeling'
              placeholder='Feeling' />
          </div>
          <div className="field">
            <label>Incident</label>
            <textarea
              className="field"
              type='text'
              name='incident'
              placeholder='Incident' />
          </div>
          <div className="field">
            <label>Reaction</label>
            <textarea
              type='text'
              name='reaction'
              placeholder='Reactions I had during event, and in hindsight' />
            </div>
          <div className="field">
            <label>Lessons Learned</label>
            <textarea
              type='text'
              name='lessonslearned'
              placeholder='Not to be so presumptuous' />
            </div>
            <div className="field">
              <label>Reflections</label>
              <textarea
                className="field"
                type='text'
                name='reflection'
                placeholder='Thoughts to reflect on' />
            </div>
            <div className="field">
              <label>Other side's perspective</label>
              <textarea
                className="field"
                type="text"
                name='otherside'
                placeholder='How might the other person have felt/reacted?' />
              </div>
          <button className="ui button" type='submit'>Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  submitForm: PropTypes.func,
};

export default ReusableForm;