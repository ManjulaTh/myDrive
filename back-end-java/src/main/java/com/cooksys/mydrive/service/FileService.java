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

	public ResponseEntity<?> getAll(Boolean trash) {
		if (trash == null) {
			trash = false;
		}
		List<FileEntity> fileList = new ArrayList<>();
		Iterable<FileEntity> fileIterable = fileRepository.findAllByTrash(trash);
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

	public ResponseEntity<?> createFile(MultipartFile file, String folderId) {
		Long correctFolderId = folderId == null || folderId.equals("null") ? null : Long.valueOf(folderId);
		FolderEntity folder = null;
		try {
			if (correctFolderId != null) {
				Optional<FolderEntity> folderOptional = folderRepository.findById(correctFolderId);
				if (folderOptional.isPresent()) {
					folder = folderOptional.get();
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}
			FileEntity fileTemp = new FileEntity(file.getOriginalFilename(), file.getContentType(), folder, file.getBytes(), false);
			fileRepository.save(fileTemp);
			if (correctFolderId != null) {
				folderService.addFileToFolder(correctFolderId, fileTemp.getId());
			}
			return ResponseEntity.ok(fileTemp);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> deleteFile(Long id) {
		Optional<FileEntity> fileOptional = fileRepository.findById(id);
		if (fileOptional.isPresent()) {
			FileEntity file = fileOptional.get();
			if (file.getFolder() != null) {
				folderService.removeFileFromFolder(file.getFolder().getId(), id);
			}
			fileRepository.deleteById(id);
			return ResponseEntity.ok(id);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
