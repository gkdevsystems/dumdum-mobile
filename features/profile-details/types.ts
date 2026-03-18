export type ProfileDetailTab = 'feed' | 'information';

export type ProfilePostType = 'image' | 'video' | 'quote';

export type ProfilePost = {
  id: string;
  type: ProfilePostType;
  caption: string;
  mediaUri?: string;
  locationLabel?: string;
  vibeLabel?: string;
  tags: string[];
  createdAtLabel: string;
  likeCount: number;
  commentCount: number;
};

export type ProfileHighlights = {
  lookingFor: string;
  values: string[];
  interests: string[];
  languages: string[];
};

export type ProfileDetails = {
  id: string;
  name: string;
  age: number;
  imageUri: string;
  location: string;
  occupation: string;
  education: string;
  height: string;
  matchPercent: number;
  about: string;
  verified: boolean;
  posts: ProfilePost[];
  highlights: ProfileHighlights;
};
