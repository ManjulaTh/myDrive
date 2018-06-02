package com.cooksys.mydrive.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cooksys.mydrive.entity.FileEntity;
import com.cooksys.mydrive.repository.FileRepository;

@Service
public class FileService {

	private FileRepository fileRepository;
	
	public FileService(FileRepository fileRepository) {
		this.fileRepository = fileRepository;
	}

	public ResponseEntity<?> getAll() {
		List<FileEntity> list = new ArrayList<>();
		Iterable<FileEntity> files = fileRepository.findAll();
		files.forEach(list::add);
		return ResponseEntity.ok(list);
	}

	public ResponseEntity<byte[]> getFile(Long id) {
		Optional<FileEntity> fileOptional = fileRepository.findById(id);
		if (fileOptional.isPresent()) {
			FileEntity file = fileOptional.get();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
					.contentLength(file.getContent().length)
					.contentType(MediaType.parseMediaType(file.getMimetype()))
					.body(file.getContent());
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> createFile(MultipartFile file) {
		try {
			FileEntity fileTemp = new FileEntity(file.getOriginalFilename(), file.getContentType(), file.getBytes(), false);
			fileRepository.save(fileTemp);
			return ResponseEntity.ok(fileTemp);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> deleteFile(Long id) {
		Optional<FileEntity> fileOptional = fileRepository.findById(id);
		if (fileOptional.isPresent()) {
			fileRepository.deleteById(id);
			return ResponseEntity.ok(id);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
