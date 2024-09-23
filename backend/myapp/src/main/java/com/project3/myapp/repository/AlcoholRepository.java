package com.project3.myapp.repository;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.project3.myapp.domain.Alcohol;
import java.util.List;

public interface AlcoholRepository extends MongoRepository<Alcohol, String> {
    List<Alcohol> findByCategory(String category);  // 카테고리로 필터링된 데이터 가져오기
    List<Alcohol> findByTitleContainingIgnoreCase(String title); //title로 검색된 데이터 가져오기
    List<Alcohol> findByIdIn(List<String> alcoholIds); // 여러 alcoholId로 전통주 목록을 반환(좋아요리스트)

    // 제품 리스트 페이지 정렬에 필요한 메서드 구현
    // 카테고리와 좋아요 순으로 정렬된 전통주 목록
    @Aggregation(pipeline = {
        "{ $match: { category: ?0 } }",  // 카테고리로 필터링
        "{ $addFields: { alcoholIdStr: { $toString: '$_id' } } }",  // _id를 문자열로 변환
        "{ $lookup: { from: 'likes', localField: 'alcoholIdStr', foreignField: 'alcoholId', as: 'likes' } }",  // 변환된 필드를 사용해 조인 이떄 localField와foreignField 타입이 같아야함
        "{ $addFields: { likeCount: { $size: '$likes' } } }",  // 좋아요 수 계산
        "{ $sort: { likeCount: -1 } }"  // 좋아요 순으로 내림차순 정렬
    })
    List<Alcohol> findByCategorySortedByLikes(String category);

    // 카테고리와 리뷰 순으로 정렬된 전통주 목록
    @Aggregation(pipeline = {
        "{ $match: { category: ?0 } }",  // 카테고리로 필터링
        "{ $addFields: { alcoholIdStr: { $toString: '$_id' } } }",  // _id를 문자열로 변환
        "{ $lookup: { from: 'reviews', localField: 'alcoholIdStr', foreignField: 'alcoholId', as: 'reviews' } }",//참조하는 컬렉션
        "{ $addFields: { reviewCount: { $size: '$reviews' } } }",
        "{ $sort: { reviewCount: -1 } }"
    })
    List<Alcohol> findByCategorySortedByReviews(String category);

    // 전체 전통주 목록을 좋아요 순으로 정렬
    @Aggregation(pipeline = {
        "{ $addFields: { alcoholIdStr: { $toString: '$_id' } } }",  // _id를 문자열로 변환
        "{ $lookup: { from: 'likes', localField: 'alcoholIdStr', foreignField: 'alcoholId', as: 'likes' } }",//참조하는 컬렉션
        "{ $addFields: { likeCount: { $size: '$likes' } } }",
        "{ $sort: { likeCount: -1 } }"
    })
    List<Alcohol> findAllAlcoholsSortedByLikes();

    // 전체 전통주 목록을 리뷰 순으로 정렬
    @Aggregation(pipeline = {
        "{ $addFields: { alcoholIdStr: { $toString: '$_id' } } }",  // _id를 문자열로 변환
        "{ $lookup: { from: 'reviews', localField: 'alcoholIdStr', foreignField: 'alcoholId', as: 'reviews' } }",//참조하는 컬렉션
        "{ $addFields: { reviewCount: { $size: '$reviews' } } }",
        "{ $sort: { reviewCount: -1 } }"
    })
    List<Alcohol> findAllAlcoholsSortedByReviews();
}
