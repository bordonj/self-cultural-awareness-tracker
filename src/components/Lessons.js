import React, { useState } from "react";
import { withFirestore, useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import styled from "styled-components";

export const Margin = styled.div`
  margin: 0 10%;
`;

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
          <h3>{lesson.id}</h3>
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
      <Margin>
        <div className="ui styled accordion">
          {renderedItems}
        </div>
      </Margin>
      </>
    )
  } else {
    return (
      <>
      <Margin>
        <h1>Access Denied.</h1>
      </Margin>
      </>
    )
  }

}


export default withFirestore(Lessons);