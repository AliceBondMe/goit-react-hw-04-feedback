import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { GlobalStyle } from './GlobalStyle';
import { Wrapper } from './App.styled';
import { useState } from 'react';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = e => {
    switch (e.target.textContent) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;

      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  const options = ['good', 'neutral', 'bad'];

  return (
    <Wrapper>
      <GlobalStyle />
      <Section
        title="Please leave feedback"
        children={
          <FeedbackOptions
            options={options}
            onLeaveFeedback={onLeaveFeedback}
          />
        }
      />

      {countTotalFeedback() > 0 ? (
        <Section
          title="Statistics"
          children={
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          }
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Wrapper>
  );
};
