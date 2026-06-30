package com.athlix.backend.service.impl;

import com.athlix.backend.entity.User;
import com.athlix.backend.repository.UserRepository;
import com.athlix.backend.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }
}