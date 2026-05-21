package com.interviewprep.backend.controller;

import com.interviewprep.backend.dto.QuestionCreateRequest;
import com.interviewprep.backend.dto.QuestionResponse;
import com.interviewprep.backend.dto.QuestionUpdateRequest;
import com.interviewprep.backend.service.InterviewQuestionService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final InterviewQuestionService interviewQuestionService;

    @PostMapping
    public ResponseEntity<QuestionResponse> createQuestion(@Valid @RequestBody QuestionCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(interviewQuestionService.createQuestion(request));
    }

    @GetMapping
    public ResponseEntity<List<QuestionResponse>> getAllQuestions() {
        return ResponseEntity.ok(interviewQuestionService.getAllQuestions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(interviewQuestionService.getQuestionById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionResponse> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionUpdateRequest request
    ) {
        return ResponseEntity.ok(interviewQuestionService.updateQuestion(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        interviewQuestionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
