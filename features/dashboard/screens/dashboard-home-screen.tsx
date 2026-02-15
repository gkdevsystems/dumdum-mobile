import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header';
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

export function DashboardHomeScreen() {
  const data = mockDashboard;
  const defaultTab = useMemo(() => data.feedTabs[0]?.id ?? 'recommended', [data.feedTabs]);
  const [activeFeedTab, setActiveFeedTab] = useState(defaultTab);

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      <ScrollView contentContainerClassName="px-4 pb-24">
        <DashboardHeader brandName={data.brandName} />
        <DashboardSearch placeholder={data.searchPlaceholder} />

        <TopMatchCard data={data.topMatch} />
        <QuickStatsGrid cards={data.quickStats} />
        <IcebreakerCard data={data.icebreaker} />
        <RecentVisitors visitors={data.visitors} />

        <FeedTabs value={activeFeedTab} tabs={data.feedTabs} onChange={setActiveFeedTab} />
        <UpgradeBanner banner={data.upgradeBanner} />

        <SectionHeader title="Recommended For You" subtitle="Based on your preferences" />
        <View>
          {data.recommended.map((profile) => (
            <RecommendedProfileCard key={profile.id} profile={profile} />
          ))}
        </View>

        <Text className="mb-4 mt-1 text-center text-xs text-app-muted">
          Mock dashboard data is loaded locally and can be switched to API easily.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

