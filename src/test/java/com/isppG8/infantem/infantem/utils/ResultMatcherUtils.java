package com.isppG8.infantem.infantem.utils;

import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.MvcResult;
import com.jayway.jsonpath.JsonPath;

public class ResultMatcherUtils {

	public static ResultMatcher isLargerThan(String path, String size) {
		Integer expectedSize = Integer.valueOf(size);
		return mvcResult -> {
			String contentAsString = mvcResult.getResponse().getContentAsString();
            		Integer currentSize = JsonPath.read(contentAsString, path);
			if (!(currentSize>expectedSize)) {
				throw new AssertionError(String.format("Size of list %d is smaller than expected (%d)",currentSize,expectedSize));
			}
		};
		

	}

}
