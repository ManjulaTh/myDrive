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
import com.cooksys.mydrive.entity.FolderEntity;
import com.cooksys.mydrive.repository.FileRepository;
import com.cooksys.mydrive.repository.FolderRepository;

@Service
public class FileService {

	private FileRepository fileRepository;
	private FolderRepository folderRepository;
	private FolderService folderService;
	
	public FileService(FileRepository fileRepository, FolderRepository folderRepository, FolderService folderService) {
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
		this.folderService = folderService;
	}

	public ResponseEntity<?> getAll() {
		List<FileEntity> fileList = new ArrayList<>();
		Iterable<FileEntity> fileIterable = fileRepository.findAll();
		fileIterable.forEach(fileList::add);
		return ResponseEntity.ok(fileList);
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

	public ResponseEntity<?> createFile(MultipartFile file, Long folderId) {
		try {
			Optional<FolderEntity> folderOptional = folderRepository.findById(folderId);
			if (folderOptional.isPresent()) {
				FolderEntity folder = folderOptional.get();
				FileEntity fileTemp = new FileEntity(file.getOriginalFilename(), file.getContentType(), folder, file.getBytes(), false);
				fileRepository.save(fileTemp);
				folderService.addFileToFolder(folderId, fileTemp.getId());
				return ResponseEntity.ok(fileTemp);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> deleteFile(Long id) {
		Optional<FileEntity> fileOptional = fileRepository.findById(id);
		if (fileOptional.isPresent()) {
			folderService.removeFileFromFolder(fileOptional.get().getFolder().getId(), fileOptional.get().getId());
			fileRepository.deleteById(id);
			return ResponseEntity.ok(id);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
