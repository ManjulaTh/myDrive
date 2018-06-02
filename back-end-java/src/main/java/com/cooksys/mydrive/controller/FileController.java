package com.cooksys.mydrive.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cooksys.mydrive.service.FileService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/files")
public class FileController {

	private FileService fileService;
	
	public FileController(FileService fileService) {
		this.fileService = fileService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAll() {
		return fileService.getAll();
	}
	
	@CrossOrigin(exposedHeaders = "content-disposition")
	@GetMapping("/{id}")
	public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
		return fileService.getFile(id);
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> createFile(@RequestParam MultipartFile file) {
		return fileService.createFile(file);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteFile(@PathVariable Long id) {
		return fileService.deleteFile(id);
	}
}
