package com.flow.pms.service;

import com.flow.pms.dto.ProjectDto;
import com.flow.pms.dto.SearchResultDto;
import com.flow.pms.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 통합 검색 서비스
 * 프로젝트, 사용자, 메뉴 등을 통합 검색하는 비즈니스 로직
 */
@Service
@Transactional(readOnly = true)
public class SearchService {

    private final ProjectService projectService;
    private final UserService userService;

    // 기본 메뉴 아이템들
    private static final List<SearchResultDto> DEFAULT_MENU_ITEMS = List.of(
        new SearchResultDto("메뉴", "대시보드", "/dashboard"),
        new SearchResultDto("메뉴", "내 프로젝트", "/projects
        package com.flow.pms.service;

import com.flow.pms.dto.ProjectDto;
import com.flow.pms.dto.SearchResultDto;
import com.flow.pms.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 통합 검색 서비스
 * 프로젝트, 사용자, 메뉴 등을 통합 검색하는 비즈니스 로직
 */
@Service
@Transactional(readOnly = true)
public class SearchService {

    private final ProjectService projectService;
    private final UserService userService;

    // 기본 메뉴 아이템들
    private static final List<SearchResultDto> DEFAULT_MENU_ITEMS = List.of(
        new SearchResultDto("메뉴", "대시보드", "/dashboard"),
        new SearchResultDto("메뉴", "내 프로젝트", "/projects