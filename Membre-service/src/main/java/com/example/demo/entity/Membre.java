package com.example.demo.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import com.example.demo.bean.EventBean;
import com.example.demo.bean.OutilBean;
import com.example.demo.bean.PublicationBean;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="type_mbr", discriminatorType=DiscriminatorType.STRING, length=10)
@Getter @Setter
@RequiredArgsConstructor @AllArgsConstructor
public abstract class Membre implements Serializable {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NonNull
	private String cin;
	@NonNull
	private String nom;
	@NonNull
	private String prenom;
	@NonNull @Temporal(TemporalType.DATE)
	private Date dateNaissance;
	private byte[] photo;
	@NonNull
	private String cv;
	@NonNull
	private String email;
	@NonNull
	private String password;
	@Transient
    private String type;
	@Transient
	Collection<PublicationBean> pubs;
	@Transient
	Collection<OutilBean> outils;
	@Transient
	Collection<EventBean> events;
	@PostLoad
    private void populateType() {
        this.type = this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }

	public Membre orElseThrow() {
		return null;
	}
}
