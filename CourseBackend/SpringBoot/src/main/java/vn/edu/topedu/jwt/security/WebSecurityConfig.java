package vn.edu.topedu.jwt.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import vn.edu.topedu.dao.AppUserDAO;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

	@Autowired
	JWTUtil jwtUtil;
	 @Autowired
	    AppUserDAO appUserDAO;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		 //JWTUtil jwtUtil= new JWTUtil();
			http/* .cors().and() */.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().exceptionHandling()
				.authenticationEntryPoint(restAuthenticationEntryPoint).and().authorizeRequests()
				.antMatchers(HttpMethod.GET, "/", "/auth/**", "/webjars/**", "/*.html", "/favicon.ico", "/**/*.html",
						"/**/*.css", "/**/*.js", "/**/*.png", "/**/*.svg")
				.permitAll()
				.antMatchers("/login").permitAll()
				.antMatchers("/api/admin/upload/finder").permitAll()
				.antMatchers("/login/email").permitAll()
				.antMatchers("/signup").permitAll()
				.antMatchers("/resource/**").permitAll()
				.antMatchers("/course/**").permitAll()
				.antMatchers("/forgotpassword/**").permitAll()
				.antMatchers("/pay/**").permitAll()
				.antMatchers("/test/**").permitAll()				
				.antMatchers("/payment/check/*").permitAll()				
				.antMatchers("/payment/buycourse/check/*").permitAll()				
				.antMatchers("/ws/**").permitAll()				
				.antMatchers("/notifications/**").permitAll()				
				.antMatchers("/home/**").permitAll()				
				.antMatchers("/admin/**").permitAll()				
				.antMatchers("/api/admin/image/list").permitAll()				
				.antMatchers("/api/admin/image/tagname").permitAll()				
				.antMatchers("/api/admin/firebase/**").permitAll()				
				.antMatchers("/api/admin/image/one").permitAll()				
				//.antMatchers("/api/admin/image/one").permitAll()				
				.antMatchers("/video/**").permitAll()
				.antMatchers("/stream/**").permitAll()
				.antMatchers("/").permitAll()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers("/mail/**").denyAll()
				.antMatchers("/auth/**").permitAll()
				
//				.antMatchers("/**/**").permitAll()
				.anyRequest()
				.authenticated().and()//.cors()
				.httpBasic().and()
				.addFilterBefore(new TokenAuthenticationFilter(jwtUtil,appUserDAO), BasicAuthenticationFilter.class);
		//http.cors();
		http.csrf().disable();
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		// TokenAuthenticationFilter will ignore the below paths
		web.ignoring().antMatchers(HttpMethod.POST, "/auth/login");
		web.ignoring().antMatchers(HttpMethod.GET, "/", "/webjars/**", "/*.html", "/favicon.ico", "/**/*.html",
				"/**/*.css", "/**/*.js");

	}
}
