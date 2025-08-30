import css from './App.module.css';
import CaseInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VotoStats'
import Notification from '../Notification/Notification';
 

import type { Votes, VoteType } from '../../types/votes';
 
import { useState } from "react";


export default function App() {
    const [votes, setVotes] = useState<Votes>({
	good: 0,
	neutral: 0,
	bad: 0
    });
  
 
  const handleVote = (type: VoteType) => {
     setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  }

  const resetVotes = () => {
      setVotes({
    good: 0,
    neutral: 0,
    bad: 0
  });
  }

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;
  
  const canReset = totalVotes > 0;

  
  return (
    <>
          <div className={css.app}>
        <CaseInfo />
        <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={canReset} />
        {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
      </div>
       
           
    </>
  );
}

 