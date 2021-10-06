import React, { useState } from "react";
import { withFirestore, useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";

const Lessons = () => {
  const [activeIndex, setActiveIndex] = useState('');
  const [currLesson, setCurrLesson] = useState('');

  const onTitleClick = idx => {
    console.log('title clicked', idx);
    if (idx === activeIndex) {
      setActiveIndex(-1);
    }
    else {
      setActiveIndex(idx);
    }
  }
  
  useFirestoreConnect([
    { collection: "lessons"}
  ]);
  
  const lessons = useSelector((state) => state.firestore.ordered.lessons);
  
  if (isLoaded(lessons)) {
    const renderedItems = lessons.map((lesson, i) => {
      return (
        <React.Fragment key={lesson.key}>
          < hr/>
          {lesson.id}
          {lesson.keys.map((key, i) => {
              console.log(lesson.definitions)
              const active = key === activeIndex ? 'active' : '';
              console.log('lesson', lesson)
              console.log('i', i)
              return (
                <>
                <div
                  onClick={() => onTitleClick(key)}
                  className={`title ${active}`}
                  key={key}
                >
                  <i className="dropdown icon"></i>
                  {key}
                </div>
                <div className={`content ${active}`} >
                  <p>{lesson.definitions[i]}</p>
                  <p>{i}</p>
                </div>
                </>
                
              )
            })}
        </React.Fragment>
      )
    })
    console.log('renderedItems', renderedItems)


    return (
      <>
      <hr />
      {/* {lessons.map(lesson => {
        return (
          <div key={lesson.id}>
            {lesson.id}
            <br />
            {lesson.keys.map((key,i) => {
              console.log(lesson.definitions)
              return (
                <li key={key}>
                {key} - {lesson.definitions[i]}
                </li>
              )
            })}
          </div>
        )
      })} */}
      <div className="ui styled accordion">
        {renderedItems}
      </div>
      </>
    )
  } else {
    return (
      <>
        <h3>Loading...</h3>
      </>
    )
  }

}


export default withFirestore(Lessons);