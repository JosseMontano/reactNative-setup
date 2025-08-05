// components/ScreenLayout.tsx
import React from 'react';
import { View } from 'react-native';
import { SafeAreaWrapper } from './safeArea';
import { FooterNavigation } from './footerNavigation';

interface ScreenLayoutProps {
  children: React.ReactNode;
  withFooter?: boolean;
}

export const ScreenLayout = ({ children, withFooter = true }: ScreenLayoutProps) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaWrapper 
        style={{ 
          paddingBottom: withFooter ? 0 : undefined, // Remove bottom padding when footer is present
          flex: 1 
        }}
      >
        {children}
      </SafeAreaWrapper>
      
      {withFooter && <FooterNavigation />}
    </View>
  );
};