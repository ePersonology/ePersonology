package io.github.epersonology.user;

import java.util.List;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = find(username);
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(username, user.getPassword(),
                AuthorityUtils.commaSeparatedStringToAuthorityList(user.getRoles()));
        }
        throw new UsernameNotFoundException("User " + username + " not verified");
    }

    public User find(String userId) {
        return repository.findOne(userId);
    }

    public List<User> find() {
        return repository.findAll();
    }

    public User create(User user) {
        return repository.save(user);
    }

    public User update(User user) {
        return repository.save(user);
    }

    public boolean delete(String userId) {
        repository.delete(userId);
        return true;
    }
}
