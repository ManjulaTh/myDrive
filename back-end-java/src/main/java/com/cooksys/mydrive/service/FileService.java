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

// Please notice me.
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
		Iterable<FileEntity> fileIterable = fileRepository.findAllByTrashAndFolderIdIsNull(trash);
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

	public ResponseEntity<?> updateFile(Long id, String name, String folderId, Boolean trash) {
		Long correctFolderId = folderId == null || folderId.equals("null") ? null : Long.valueOf(folderId);
		Optional<FileEntity> fileOptional = fileRepository.findById(id);
		
		if (fileOptional.isPresent()) {
			FileEntity file = fileOptional.get();
			
			if (name != null) {
				file.setName(name);
			}
			
			if (folderId != null) {
				FolderEntity currentFolder = file.getFolder();
				if (currentFolder != null) {
					folderService.removeFileFromFolder(currentFolder.getId(), id);
				}
				if (correctFolderId != 0) {
					Optional<FolderEntity> folderOptional = folderRepository.findById(correctFolderId);
					if (! folderOptional.isPresent()) {
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
					}
					folderService.addFileToFolder(correctFolderId, id);
					file.setFolder(folderOptional.get());
				} else {
					file.setFolder(null);
				}
			}
			
			if (trash != null) {
				file.setTrash(trash);
			}
			fileRepository.save(file);
			return ResponseEntity.ok(file);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
