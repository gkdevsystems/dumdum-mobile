import { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { DashboardSearch } from '@/features/dashboard/components/dashboard-search';
import { FeedTabs } from '@/features/dashboard/components/feed-tabs';
import { IcebreakerCard } from '@/features/dashboard/components/icebreaker-card';
import { QuickStatsGrid } from '@/features/dashboard/components/quick-stats-grid';
import { RecentVisitors } from '@/features/dashboard/components/recent-visitors';
import { RecommendedProfileCard } from '@/features/dashboard/components/recommended-profile-card';
import { SectionHeader } from '@/features/dashboard/components/section-header';
import { TopMatchCard } from '@/features/dashboard/components/top-match-card';
import { UpgradeBanner } from '@/features/dashboard/components/upgrade-banner';
import { mockDashboard } from '@/features/dashboard/data/mock-dashboard';
import type { DashboardProfile } from '@/shared/dashboard/types';

const PROFILE_PAGE_SIZE = 6;

export function DashboardHomeScreen() {
  const data = mockDashboard;
  const defaultTab = useMemo(() => data.feedTabs[0]?.id ?? 'recommended', [data.feedTabs]);
  const [activeFeedTab, setActiveFeedTab] = useState(defaultTab);
  const [visibleCount, setVisibleCount] = useState(PROFILE_PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const visibleProfiles = useMemo(
    () => data.recommended.slice(0, visibleCount),
    [data.recommended, visibleCount]
  );
  const hasMoreProfiles = visibleCount < data.recommended.length;

  const loadMoreProfiles = useCallback(() => {
    if (!hasMoreProfiles || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((previous) => Math.min(previous + PROFILE_PAGE_SIZE, data.recommended.length));
      setIsLoadingMore(false);
    }, 350);
  }, [data.recommended.length, hasMoreProfiles, isLoadingMore]);

  const renderProfileItem = useCallback(
    ({ item }: { item: DashboardProfile }) => <RecommendedProfileCard profile={item} />,
    []
  );

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1 bg-app-background">
      <FlatList
        data={visibleProfiles}
        keyExtractor={(item) => item.id}
        renderItem={renderProfileItem}
        onEndReached={loadMoreProfiles}
        onEndReachedThreshold={0.35}
        ListHeaderComponent={
          <View className="px-4 pb-2 pt-4">
            <DashboardSearch placeholder={data.searchPlaceholder} />
            <TopMatchCard data={data.topMatch} />
            <QuickStatsGrid cards={data.quickStats} />
            <IcebreakerCard data={data.icebreaker} />
            <RecentVisitors visitors={data.visitors} />
            <FeedTabs value={activeFeedTab} tabs={data.feedTabs} onChange={setActiveFeedTab} />
            <UpgradeBanner banner={data.upgradeBanner} />
            <SectionHeader title="Recommended For You" subtitle="Based on your preferences" />
          </View>
        }
        ListFooterComponent={
          <View className="px-4 pb-28 pt-1">
            {isLoadingMore ? (
              <Text className="text-center text-sm text-app-muted">Loading more profiles...</Text>
            ) : (
              <Text className="text-center text-xs text-app-muted">
                Showing {visibleProfiles.length} of {data.recommended.length} profiles
              </Text>
            )}
          </View>
        }
        contentContainerClassName="pb-2"
      />
    </SafeAreaView>
  );
}
