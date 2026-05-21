package com.interviewprep.backend.controller;

import com.interviewprep.backend.dto.DashboardSummaryResponse;
import com.interviewprep.backend.service.InterviewQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final InterviewQuestionService interviewQuestionService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getDashboardSummary() {
        return ResponseEntity.ok(interviewQuestionService.getDashboardSummary());
    }
}
