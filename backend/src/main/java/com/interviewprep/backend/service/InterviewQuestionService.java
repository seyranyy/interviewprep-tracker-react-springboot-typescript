package com.interviewprep.backend.service;

import com.interviewprep.backend.dto.DashboardSummaryResponse;
import com.interviewprep.backend.dto.QuestionCreateRequest;
import com.interviewprep.backend.dto.QuestionResponse;
import com.interviewprep.backend.dto.QuestionUpdateRequest;
import com.interviewprep.backend.entity.InterviewQuestion;
import com.interviewprep.backend.enums.Difficulty;
import com.interviewprep.backend.enums.QuestionStatus;
import com.interviewprep.backend.exception.ResourceNotFoundException;
import com.interviewprep.backend.repository.InterviewQuestionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InterviewQuestionService {

    private final InterviewQuestionRepository interviewQuestionRepository;

    public QuestionResponse createQuestion(QuestionCreateRequest request) {
        InterviewQuestion question = InterviewQuestion.builder()
                .title(request.getTitle())
                .answer(request.getAnswer())
                .category(request.getCategory())
                .difficulty(request.getDifficulty())
                .status(request.getStatus())
                .notes(request.getNotes())
                .build();

        return toResponse(interviewQuestionRepository.save(question));
    }

    public List<QuestionResponse> getAllQuestions() {
        return interviewQuestionRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public QuestionResponse getQuestionById(Long id) {
        return toResponse(findQuestionById(id));
    }

    public QuestionResponse updateQuestion(Long id, QuestionUpdateRequest request) {
        InterviewQuestion question = findQuestionById(id);

        question.setTitle(request.getTitle());
        question.setAnswer(request.getAnswer());
        question.setCategory(request.getCategory());
        question.setDifficulty(request.getDifficulty());
        question.setStatus(request.getStatus());
        question.setNotes(request.getNotes());

        return toResponse(interviewQuestionRepository.save(question));
    }

    public void deleteQuestion(Long id) {
        InterviewQuestion question = findQuestionById(id);
        interviewQuestionRepository.delete(question);
    }

    public DashboardSummaryResponse getDashboardSummary() {
        return DashboardSummaryResponse.builder()
                .totalQuestions(interviewQuestionRepository.count())
                .notStartedCount(interviewQuestionRepository.countByStatus(QuestionStatus.NOT_STARTED))
                .learningCount(interviewQuestionRepository.countByStatus(QuestionStatus.LEARNING))
                .reviewCount(interviewQuestionRepository.countByStatus(QuestionStatus.REVIEW))
                .masteredCount(interviewQuestionRepository.countByStatus(QuestionStatus.MASTERED))
                .easyCount(interviewQuestionRepository.countByDifficulty(Difficulty.EASY))
                .mediumCount(interviewQuestionRepository.countByDifficulty(Difficulty.MEDIUM))
                .hardCount(interviewQuestionRepository.countByDifficulty(Difficulty.HARD))
                .build();
    }

    private InterviewQuestion findQuestionById(Long id) {
        return interviewQuestionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
    }

    private QuestionResponse toResponse(InterviewQuestion question) {
        return QuestionResponse.builder()
                .id(question.getId())
                .title(question.getTitle())
                .answer(question.getAnswer())
                .category(question.getCategory())
                .difficulty(question.getDifficulty())
                .status(question.getStatus())
                .notes(question.getNotes())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt())
                .build();
    }
}
