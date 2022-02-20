export function findPrevChapter(chapters, collection, chapterNum) {
  const chapterIndex = chapters.findIndex(
    (e) => e.collection === collection && e.chapterNum === chapterNum,
  );
  if (chapterIndex === 0) {
    return -1;
  } else {
    return chapters[chapterIndex - 1];
  }
}

export function findNextChapter(chapters, collection, chapterNum) {
  const chapterIndex = chapters.findIndex(
    (e) => e.collection === collection && e.chapterNum === chapterNum,
  );
  if (chapterIndex === chapters.length - 1) {
    return -1;
  } else {
    return chapters[chapterIndex + 1];
  }
}
