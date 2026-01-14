package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.demo.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.bean.PublicationBean;
import com.example.demo.entity.EnseignantChercheur;
import com.example.demo.entity.Etudiant;
import com.example.demo.entity.Membre;
import com.example.demo.entity.Membre_Pub_Id;
import com.example.demo.entity.Membre_Publication;
import com.example.demo.proxy.PublicationProxyService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MembreImpl implements IMembreService {
	MembreRepository membreRepository;
	EtudiantRepository etudiantRepository;
	MembreOutilRepository membreOutilRepository;
	MembreEventRepository membreEventRepository;
	EnseignantRepository enseignantRepository;

	MembrePubRepository membrePubRepository;
	PublicationProxyService publicationProxyService;
	PasswordEncoder passwordEncoder;

	public Membre addMembre(Membre m) {

		// ✅ encode password once
		if (m.getPassword() != null && !m.getPassword().startsWith("$2a$") && !m.getPassword().startsWith("$2b$")) {
			m.setPassword(passwordEncoder.encode(m.getPassword()));
		}

		Membre saved = membreRepository.save(m);

		if (saved instanceof Etudiant etd) {
			if (etd.getEncadrantId() != null) {
				this.affecterEncadrant(etd.getId(), etd.getEncadrantId());
			}
		}
		return saved;
	}

	@Transactional
	public void deleteMembre(Long id) {
		membrePubRepository.deleteByMembreId(id);
		membreOutilRepository.deleteByMembreId(id);
		membreEventRepository.deleteByMembreId(id);

		membreRepository.deleteById(id);
	}

	public Membre updateMembre(Membre m) {
		if (m.getPassword() != null && !m.getPassword().startsWith("$2a$") && !m.getPassword().startsWith("$2b$")) {
			m.setPassword(passwordEncoder.encode(m.getPassword()));
		}
		return membreRepository.saveAndFlush(m);
	}
	public Optional<Membre> findMembre(Long id) {
		return membreRepository.findById(id);
	}

	public List<Membre> findAll() {
		return membreRepository.findAll();
	}

	public Membre findByCin(String cin) {
		return membreRepository.findByCin(cin);
	}

	public Optional<Membre> findByEmail(String email) {
		return membreRepository.findByEmail(email);
	}

	public List<Membre> findByNom(String nom) {
		return membreRepository.findByNom(nom);
	}

	public List<Etudiant> findByDiplome(String diplome) {
		return etudiantRepository.findByDiplome(diplome);
	}

	public List<EnseignantChercheur> findByGrade(String grade) {
		return enseignantRepository.findByGrade(grade);
	}

	public List<EnseignantChercheur> findByEtablissement(String etablissement) {
		return enseignantRepository.findByEtablissement(etablissement);
	}

	public String affecterEncadrant(Long idEtd, Long idEns) {
		Etudiant etd = (Etudiant) this.findMembre(idEtd).get();
		EnseignantChercheur encadrant = (EnseignantChercheur) this.findMembre(idEns).get();
		etd.setEncadrant(encadrant);
		this.updateMembre(etd);
		return "Encadrant " + encadrant.getPrenom() + " " + encadrant.getNom() + " affecté avec succés à l'étudiant "
				+ etd.getPrenom() + " " + etd.getNom();
	}

	public List<Etudiant> afficherEtudiantsEncadres(Long idEns) {
		EnseignantChercheur ens = enseignantRepository.findById(idEns).get();
		return etudiantRepository.findByEncadrant(ens);
	}

	public void affecterauteurTopublication(Long idauteur, Long idpub) {
		Membre mbr = membreRepository.findById(idauteur).get();
		Membre_Publication mbs = new Membre_Publication();
		mbs.setMembre(mbr);
		mbs.setId(new Membre_Pub_Id(idpub, idauteur));
		membrePubRepository.save(mbs);
	}

	public List<PublicationBean> findAllPublicationparauteur(Long idauteur) {
		List<PublicationBean> pubs = new ArrayList<PublicationBean>();
		List<Membre_Publication> idpubs = membrePubRepository.findPubsByMembreId(idauteur);
		idpubs.forEach(s -> {
			System.out.println(s);
			pubs.add(publicationProxyService.findOnePublicationById(s.getId().getPublication_id()));
		});
		return pubs;
	}

}
