package com.cooksys.mydrive.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.mydrive.service.FolderService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/folders")
public class FolderController {

	@Autowired
	FolderService folderService;
	
	public FolderController(FolderService folderService) {
		this.folderService = folderService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAll(@RequestParam(required=false) Boolean trash) {
		return folderService.getAll(trash);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getFile(@PathVariable Long id) {
		return folderService.get(id);
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> createFolder(@RequestParam String name) {
		System.out.println(name);
		return folderService.createFolder(name);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteFolder(@PathVariable Long id) {
		return folderService.deleteFolder(id);
	}
	
	
}
