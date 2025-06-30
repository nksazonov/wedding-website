'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface QuestionAndAnswerProps {
  question: string;
  answer: string;
  className?: string;
}

export default function QuestionAndAnswer({ question, answer, className }: QuestionAndAnswerProps) {
  return (
    <div className={`${className}`}>
      {/* Question */}
      <div className="mb-3">
        <h5 className="text-xl md:text-xl text-gray-800 font-[Cormorant_Infant]">
          {question}
        </h5>
      </div>

      {/* Answer */}
      <div className="flex items-start gap-3">
        <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 text-sm mt-1.75" />
        <p className="text-lg text-gray-700 leading-relaxed font-[Inter]">
          {answer}
        </p>
      </div>
    </div>
  );
}
