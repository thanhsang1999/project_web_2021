package vn.edu.topedu.rest.test;



import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Mono;
import vn.edu.topedu.model.Video;
import vn.edu.topedu.response.model.VideoResponse;
import vn.edu.topedu.service.IVideoStreamService;

@RestController
@RequestMapping("/test")
public class TestVideoREST {

	private final IVideoStreamService videoStreamService;

	public TestVideoREST(IVideoStreamService videoStreamService) {
		this.videoStreamService = videoStreamService;
	}

	@GetMapping("/stream/{fileType}/{fileName}")
	public Mono<ResponseEntity<byte[]>> streamVideo(
			@RequestHeader(value = "Range", required = false) String httpRangeList,
			@PathVariable("fileType") String fileType, @PathVariable("fileName") String fileName) {
		return Mono.just(videoStreamService.prepareContent(fileName, fileType, httpRangeList));
	}
	@GetMapping("/video")
	public List<VideoResponse> videos() {
		Video video=new Video(1,"image/default/mp4.jpg", 5000,"demo");
		List<VideoResponse> videos= Arrays.asList(video.toResponse()
				);
		return videos;
	}
}