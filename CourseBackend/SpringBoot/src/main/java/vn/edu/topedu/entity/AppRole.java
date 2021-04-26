package vn.edu.topedu.entity;
 
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

import vn.edu.topedu.entity.detailcourse.DetailCourseEntity;
 
@Entity

@Table(name = "App_Role", //
        uniqueConstraints = { //
                @UniqueConstraint(name = "APP_ROLE_UK", columnNames = "Role_Name") })
public class AppRole implements GrantedAuthority {
     
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
 
    @Column(name = "Role_Name", length = 30, nullable = false)
    private String roleName;
 
    @OneToMany(mappedBy = "appRole")
	@JsonIgnore
	private List<UserRole> userRole;
 
    public String getRoleName() {
        return roleName;
    }
 
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String getAuthority() {
		
		return this.roleName;
	}

	public List<UserRole> getUserRole() {
		return userRole;
	}

	public void setUserRole(List<UserRole> userRole) {
		this.userRole = userRole;
	}
	
     
}