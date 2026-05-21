package com.interviewprep.backend.repository;

import com.interviewprep.backend.entity.InterviewQuestion;
import com.interviewprep.backend.enums.Difficulty;
import com.interviewprep.backend.enums.QuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Long> {

    long countByStatus(QuestionStatus status);

    long countByDifficulty(Difficulty difficulty);
}
